"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

export function NoteCard({ note, onNoteDeleted }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left bg-stone-800 p-5 overflow-hidden outline-none relative flex flex-col gap-3 duration-200 hover:ring-2 hover:ring-stone-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm text-stone-200 font-medium">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm text-stone-400 leading-6">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50 " />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-stone-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-stone-800 p-1.5 text-stone-400 hover:text-stone-100 duration-200">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm text-stone-200 font-medium">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm text-stone-400 leading-6">{note.content}</p>
          </div>

          <button
            type="button"
            className="w-full bg-stone-800 py-4 text-center text-sm text-stone-300 font-medium group"
          >
            Deseja{" "}
            <span
              onClick={() => onNoteDeleted(note.id)}
              className="text-red-400 group-hover:underline duration-200"
            >
              apagar essa nota?
            </span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
