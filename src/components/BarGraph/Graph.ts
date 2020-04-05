export type Point = number[];

export interface Dot {
  x: number;
  y: number;
  r: number;
  c: string;
}

export default class Graph {
  // Properties of a line
  // I:  - pointA (array) [x,y]: coordinates
  //     - pointB (array) [x,y]: coordinates
  // O:  - (object) { length: l, angle: a }: properties of the line
  line(pointA: Point, pointB: Point) {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    };
  }

  // Position of a control point
  // I:  - current (array) [x, y]: current point coordinates
  //     - previous (array) [x, y]: previous point coordinates
  //     - next (array) [x, y]: next point coordinates
  //     - reverse (boolean, optional): sets the direction
  // O:  - (array) [x,y]: a tuple of coordinates
  controlPoint(
    current: Point,
    previous: Point,
    next: Point,
    smoothing: number,
    reverse: boolean = false
  ) {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current;
    const n = next || current;

    // Properties of the opposed-line
    const o = this.line(p, n);

    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;

    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  }

  // Create the bezier curve command
  // I:  - point (array) [x,y]: current point coordinates
  //     - i (integer): index of 'point' in the array 'a'
  //     - a (array): complete array of points coordinates
  // O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
  bezierCommand(point: Point, i: number, a: Point[], smoothing: number) {
    // start control point
    const cps = this.controlPoint(a[i - 1], a[i - 2], point, smoothing);

    // end control point
    const cpe = this.controlPoint(point, a[i - 1], a[i + 1], smoothing, true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
  }

  // Render the svg <path> element
  // I:  - points (array): points coordinates
  //     - command (function)
  //       I:  - point (array) [x,y]: current point coordinates
  //           - i (integer): index of 'point' in the array 'a'
  //           - a (array): complete array of points coordinates
  //       O:  - (string) a svg path command
  // O:  - (string): a Svg <path> element
  svgPath(points: Point[], smoothing: number = 0.01) {
    // build the d attributes by looping over the points
    const d = points.reduce(
      (acc, point, i, a) =>
        i === 0
          ? `M ${point[0]},${point[1]}`
          : `${acc} ${this.bezierCommand(point, i, a, smoothing)}`,
      ""
    );
    return `${d}`;
  }

  svgLinePath(points: Point[]) {
    // build the d attributes by looping over the points
    const d = points.reduce(
      (acc, point, i, a) => `M ${point[0]},${point[1]}`,
      ""
    );
    return `${d}`;
  }

  makeData(
    scores: number[],
    min: number,
    max: number,
    w: number,
    selectedIndex?: number
  ) {
    const data: Point[] = [];

    const xScale = w / Math.max(scores.length - 1, 1);
    const yScale = -45 * (320 / w);
    const yOffset = 290;

    const dots: Dot[] = [];

    const normalize = (v: number) => {
      const diff = max - min;
      if (diff == 0) {
        return yOffset + yScale / 2;
      }
      return ((v - min) / diff) * yScale + yOffset;
    };

    data.push([-100, normalize(scores[0])]);

    scores.map((d, idx) => {
      const x = idx * xScale;
      const y = normalize(d);
      data.push([x, y]);

      if (idx == selectedIndex) {
        dots.push({
          x: x,
          y: y,
          r: 1,
          c: "red", //TODO: update later
        });
      }
    });

    data.push([w + 100, normalize(scores[scores.length - 1])]);
    data.push([w + 100, -100]);
    data.push([-100, -100]);

    return {
      data: data,
      dots: dots,
    };
  }
}
