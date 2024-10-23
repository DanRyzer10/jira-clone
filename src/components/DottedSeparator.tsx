import { cn } from "@/lib/utils";

interface DottedSeparatorProps {
    className?:string;
    color?:string;
    height?:string;
    dotSize?:string;
    gapSize?:string;
    direction?:'horizontal'|'vertical';
}


export const DottedSeparator = ({
    className,
    color="#d4d4d8",
    height="2px",
    dotSize="2px",
    gapSize="6px",
    direction="horizontal"

    }:DottedSeparatorProps) =>{
    const isHorizontal = direction === 'horizontal';
    return (
        <div className={
            cn(isHorizontal?"w-full flex items-center":"h-full flex flex-col",className)
        }>
            <div className={isHorizontal?"flex-grow":"flex-grow-0"}
                style={{
                    backgroundImage:isHorizontal?`repeating-linear-gradient(to right, ${color}, ${color} ${dotSize}, transparent ${dotSize}, transparent ${gapSize})`:`repeating-linear-gradient(to bottom, ${color}, ${color} ${dotSize}, transparent ${dotSize}, transparent ${gapSize})`,
                    width:isHorizontal?height:undefined,
                    height:"1px",
                    backgroundSize:isHorizontal?`${dotSize} ${height}`:`${height} ${dotSize}`,
                    backgroundPosition:"center"
                }}
            >
                

            </div>
        </div>
    )

}