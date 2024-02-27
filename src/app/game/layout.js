import ContainProvider from "@/components/ContainProvider";
import ContainerGame from "@/components/ContainerGame";
import { store } from "@/redux/store";
export const metadata = {
    title: "F2F Challenge - Game",
    description: "De Alcon Laboratorios",
};

export default function GameLoyout({ children }) {

    return (
        <ContainProvider store={store}>
        <ContainerGame>
            {children}
        </ContainerGame>

        </ContainProvider>
    )
}