import ContainerGame from "@/components/ContainerGame";

export const metadata = {
    title: "F2F Challenge - Game",
    description: "De Alcon Laboratorios",
};

export default function GameLoyout({ children }) {

    return (
        <ContainerGame>
            {children}
        </ContainerGame>
    )
}