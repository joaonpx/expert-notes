import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="h-screen bg-stone-900 text-stone-200 antialiased flex flex-col justify-center py-32 px-12 gap-12 text-pretty lg:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            Bem vindo ao{" "}
            <span className="italic font-light text-lime-300">
              expert notes
            </span>
          </h1>
          <p className="text-stone-400 text-lg">
            Aqui você cria e armazena suas notas de maneira simples e
            inteligente.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="bg-lime-400 text-stone-900 flex items-center justify-center gap-1 p-2 rounded-sm lg:bg-transparent lg:text-stone-200 hover:-transtone-y-1 duration-200 lg:hover:bg-lime-400 lg:hover:text-stone-900 lg:hover:border-lime-400"
        >
          Teste agora <ArrowUpRight width={16} height={16} />
        </Link>
      </main>
    </>
  );
}
