import { useEffect, useState } from "react";

export const usersSVGStart = (
  <clipPath clipPathUnits="objectBoundingBox" id="gradientmask">
    <path d={`M${Math.random()},0.6 L0,1 L0,1 Z`} />
    <path d="M0,0 L0.15,0 L0,0 Z" />
    <path d="M0.9,0.6 0.9,0.6 L0.9,0.6 0.9,0.6" />
  </clipPath>
);

export function useMovingSVG() {
  const [boxes, setBoxes] = useState([]);
  const [update, setUpdate] = useState(false);

  // Move the boxes
  useEffect(() => {
    if (boxes.length > 0) {
      let tb = boxes;
      for (let i = 0; i < tb.length; i++) {
        tb[i].center = {
          x: tb[i].center.x + tb[i].speed.x,
          y: tb[i].center.y + tb[i].speed.y,
        };
        for (let t = 0; t < tb[i].points.length; t++) {
          tb[i].points[t] = {
            x: tb[i].points[t].x + tb[i].speed.x,
            y: tb[i].points[t].y + tb[i].speed.y,
          };
          tb[i].points[t] = rotatePoint(
            tb[i].center.x,
            tb[i].center.y,
            tb[i].speed.rotSpeed,
            tb[i].points[t]
          );
        }
        if (tb[i].center.x > 1) {
          tb[i].speed.x = -tb[i].speed.x;
        }
        if (tb[i].center.x < 0) {
          tb[i].speed.x = -tb[i].speed.x;
        }
        if (tb[i].center.y > 0.5) {
          tb[i].speed.y = -tb[i].speed.y;
        }
        if (tb[i].center.y < 0) {
          tb[i].speed.y = -tb[i].speed.y;
        }
      }
      setBoxes(tb);
    }
  }, [update]);

  // create the boxes
  useEffect(() => {
    let myBoxes = [];
    for (let i = 0; i < Math.random() * 2 + 80; i++) {
      let box = createBox(
        Math.random(),
        Math.random() * 0.45,
        Math.random() / 25 + 0.002,
        Math.random() * 0.004 - 0.002,
        Math.random() * 0.004 - 0.002,
        Math.random() * 0.2 - 0.1
      );
      box = rotateBox(box, Math.random());
      myBoxes.push(box);
    }
    console.log(myBoxes);
    setBoxes(myBoxes);
    setUpdate(!update);
    let intervalID = setInterval(() => {
      setUpdate((update) => {
        console.log("updated");
        return !update;
      });
    }, 500);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const usersSVGStart = (
    <clipPath clipPathUnits="objectBoundingBox" id="gradientmask">
      {boxes.map((box) => {
        let path = `M`;
        path += `${box.center.x},${box.center.y > 0.2 ? "0.5" : "0"} `;
        for (let i = 1; i < box.points.length; i++) {
          path += `L${box.center.x},${box.center.y > 0.2 ? "0.5" : "0"} `;
        }
        path += `Z`;

        return <path d={path} />;
      })}
    </clipPath>
  );

  const usersSVGEnd = (
    <clipPath clipPathUnits="objectBoundingBox" id="gradientmask">
      {boxes.map((box) => {
        let path = `M`;
        path += `${box.points[0].x},${box.points[0].y} `;
        for (let i = 1; i < box.points.length; i++) {
          path += `L${box.points[i].x},${box.points[i].y} `;
        }
        path += `Z`;

        return <path d={path} />;
      })}
    </clipPath>
  );
  return { usersSVGStart, usersSVGEnd };
}
export const usersSVGEnd = (
  <clipPath clipPathUnits="objectBoundingBox" id="gradientmask">
    <path d="M0.5,0.3 0.6,0.4 L0.7,0.3 0.6,0.2" />
  </clipPath>
);

function rotatePoint(cx, cy, angle, { x, y }) {
  let s = Math.sin(angle);
  let c = Math.cos(angle);

  x -= cx;
  y -= cy;

  let newX = x * c - y * s;
  let newY = x * s + y * c;

  x = newX + cx;
  y = newY + cy;

  return { x, y };
}

function createBox(x, y, size, speedX, speedY, rotSpeed) {
  return {
    speed: { x: speedX, y: speedY, rotSpeed },
    center: { x, y },
    points: [
      { x: x - size, y: y + size },
      { x: x + size, y: y + size },
      { x: x + size, y: y - size },
      { x: x - size, y: y - size },
    ],
  };
}

function rotateBox(box, angle) {
  for (let i = 0; i < box.points.length; i++) {
    box.points[i] = rotatePoint(
      box.center.x,
      box.center.y,
      angle,
      box.points[i]
    );
  }
  return box;
}
