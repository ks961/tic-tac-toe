
export type CircleProps = {
    width: number,
    height: number
}

export default function Circle({ width, height }: CircleProps) {

    return(
        <svg style={{width: `${width}px`, height: `${height}px`}} xmlns="http://www.w3.org/2000/svg">
            <circle r={`${width / 3}`} cx={`${width - (width/2)}`} cy={`${height - (height/2)}`} stroke="#000" fill="transparent" stroke-width="1.5" />
        </svg>
    );
}