import Image from "next/image";
import { Button } from "./components/button/button";

export default function Home() {
  return (
    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <Button className="bg-[#641616] "></Button>
      <Button
          bgColor="#de0000"
          className="rounded-full"
          shadow="large"
          shadowColor="rgba(255, 255, 255, 0.3)"
          variant="primary"
        >
          Test
        </Button>
    </div>
  );
}
