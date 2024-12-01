// 각 카테고리별 아이템 리스트 (이미지 경로)
const partsData = {
    clothes: [
        { img: 'images/clothes0.png', appliedImage: 'images/applied-clothes0.png' },
        { img: 'images/clothes1.png', appliedImage: 'images/applied-clothes1.png' }, 
        { img: 'images/clothes2.png', appliedImage: 'images/applied-clothes2.png' }
    ],
    hair: [
        { img: 'images/hair0.png', appliedImage: 'images/applied-hair0.png' },
        { img: 'images/hair1.png', appliedImage: 'images/applied-hair2.png' },
        { img: 'images/hair2.png', appliedImage: 'images/applied-hair1.png' }
    ],
    accessories: [
        { img: 'images/face0.png', appliedImage: 'images/applied-face0.png' },
        { img: 'images/face1.png', appliedImage: 'images/applied-face2.png' },
        { img: 'images/face2.png', appliedImage: 'images/applied-face1.png' }
    ]
};

// 카테고리별로 선택된 파츠를 추적
const selectedParts = {
    clothes: null,
    hair: null,
    accessories: null,
};

// 카테고리 클릭 시 해당 파츠 아이템 나열
function showParts(category) {
    const partsContainer = document.getElementById('parts-container');
    partsContainer.innerHTML = ''; // 기존 아이템 제거

    // 카테고리 버튼 이미지 변경
    const buttons = document.querySelectorAll('.category-button');
    buttons.forEach(button => {
        // 클릭한 버튼의 카테고리 이름과 일치하면 selected 이미지로 변경
        if (button.alt === category) {
            button.src = `images/${category}-selected.png`; // 선택된 카테고리 버튼 이미지
        } else {
            button.src = `images/${button.alt}-button.png`; // 기본 이미지로 변경
        }
    });

    // 해당 카테고리의 이미지 아이템 나열
    partsData[category].forEach(part => {
        const img = document.createElement('img');
        img.src = part.img; // 원본 이미지 경로
        img.alt = `${category} item`;
        img.classList.add('part-item');
        img.onclick = () => applyPart(category, part); // 클릭하면 파츠 적용
        partsContainer.appendChild(img);
    });
}

// 캐릭터에 파츠 적용
function applyPart(category, part) {
    const characterContainer = document.querySelector('.character-container');

    // 이전에 선택한 해당 카테고리의 파츠 삭제
    const existingPart = document.querySelector(`.${category}-part`);
    if (existingPart) {
        existingPart.remove();
    }

    // 새로 선택된 파츠 추가
    const newPart = document.createElement('img');
    newPart.src = part.appliedImage; // 적용된 이미지 경로
    newPart.alt = `${category} 선택된 파츠`;
    newPart.classList.add(`${category}-part`, 'selected-part');
    newPart.style.position = 'absolute'; // 캐릭터 위에 올리기
    newPart.style.top = '0';
    newPart.style.left = '0';
    newPart.style.zIndex = '2'; // 캐릭터보다 위에 보이도록 설정
    characterContainer.appendChild(newPart);

    // 선택 상태 업데이트
    selectedParts[category] = part;
}

// 캐릭터 배경 이미지 변경
function changeCharacter(background) {
    const character = document.querySelector('#character'); // 캐릭터 이미지
    character.src = `images/${background}.png`; // 선택된 배경에 맞는 이미지 경로로 변경
}

// 모든 적용된 파츠 초기화 함수
function resetAllParts() {
    const characterContainer = document.querySelector('.character-container');

    // 모든 파츠 제거
    const appliedParts = characterContainer.querySelectorAll('.selected-part');
    appliedParts.forEach(part => part.remove());

    // 선택된 파츠 상태 초기화
    Object.keys(selectedParts).forEach(category => {
        selectedParts[category] = null;
    });

    alert('모든 파츠가 초기화되었습니다!');
}
function saveCharacterImage() {
    const characterContainer = document.querySelector('.character-container');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 캐릭터 이미지 크기 설정
    canvas.width = 2667;
    canvas.height = 2000;

    // 캐릭터 이미지를 캔버스에 그리기
    const characterImage = document.querySelector('#character');
    ctx.drawImage(characterImage, 0, 0, canvas.width, canvas.height);

    // 파츠들을 그리기
    const appliedParts = characterContainer.querySelectorAll('.selected-part');
    let imagesLoaded = 0; // 로드된 이미지의 수
    const totalImages = appliedParts.length; // 총 이미지 수

    // 파츠들이 모두 로드된 후 이미지를 그리기
    appliedParts.forEach(part => {
        const partImage = new Image();
        partImage.src = part.src; // 파츠 이미지 경로

        // 이미지가 로드된 후 그리기
        partImage.onload = () => {
            ctx.drawImage(partImage, 0, 0, canvas.width, canvas.height);

            imagesLoaded++;

            // 모든 이미지가 로드되었을 때 저장
            if (imagesLoaded === totalImages) {
                const dataURL = canvas.toDataURL('image/png'); // 캔버스를 PNG로 변환
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'character-image.png'; // 다운로드할 파일 이름
                link.click(); // 다운로드 시작
            }
        };
    });

    // 만약 파츠가 하나도 없을 경우 (이미지 없으면 바로 저장)
    if (totalImages === 0) {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'character-image.png';
        link.click();
    }
}

function goToInstagram() {
    window.open('https://www.instagram.com/monnanees_official', '_blank');
}