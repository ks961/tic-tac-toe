import Text from "@/components/Text/Text";
import { useParams } from "react-router-dom";




export default function Multiplayer() {
    const { gameSessionId } = useParams();
    console.log(gameSessionId);
    return(
        <>
            <Text as="h1">{gameSessionId}</Text>
        </>
    );
}