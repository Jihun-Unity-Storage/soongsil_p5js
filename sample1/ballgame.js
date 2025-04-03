let circleX = 150;  // 원의 초기 x 위치
let circleY = 100;  // 원의 초기 y 위치
let speed = 5;      // 원의 이동 속도
let hp = 255;       // 원의 초기 HP (투명도)
let arrows = [];    // 화살 배열

function setup() {
  createCanvas(400, 400);
  stroke(0);
  fill(30);
}
function draw() {
    background(200);
  
    // 키 입력에 따라 원을 움직임
    if (keyIsDown(LEFT_ARROW)) {
      circleX -= speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      circleX += speed;
    }
    if (keyIsDown(UP_ARROW)) {
      circleY -= speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      circleY += speed;
    }
  
    // 화살 생성 (랜덤으로 떨어짐)
    if (frameCount % 30 === 0) {
      let arrowX = random(width);
      arrows.push({ x: arrowX, y: 0 });
    }
  
    // 화살 그리기 및 이동
    for (let i = arrows.length - 1; i >= 0; i--) {
      let arrow = arrows[i];
      fill(255, 0, 0);
      rect(arrow.x, arrow.y, 10, 20); // 화살 모양
      arrow.y += 5; // 화살이 아래로 떨어짐
  
      // 화살과 원의 충돌 감지
      if (dist(arrow.x, arrow.y, circleX, circleY) < 25) {
        hp -= 25; // HP 감소
        arrows.splice(i, 1); // 화살 제거
      } else if (arrow.y > height) {
        arrows.splice(i, 1); // 화면 밖으로 나간 화살 제거
      }
    }
  
    // HP에 따라 원의 투명도 조정
    fill(30, hp);
    ellipse(circleX, circleY, 50, 50);
  
    // HP가 0 이하가 되면 게임 종료
    if (hp <= 0) {
      noLoop();
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("Game Over", width / 2, height / 2);
    }
    text("HP: " + hp, 50, 30); // HP 표시
  }