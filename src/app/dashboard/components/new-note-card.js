"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function NewNoteCard({ onNoteCreated }) {
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition | null;

  speechRecognition = null;

  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChanged(event) {
    setContent(event.target.value);

    if (event.target.value === "") {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(event) {
    event.preventDefault();

    if (content === "") {
      return;
    }

    onNoteCreated(content);

    setContent("");
    setShouldShowOnBoarding(true);

    toast.success("Nota criada com sucesso!");
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Infelizmente seu navegador não suporta a API da gravação!");

      return;
    }

    setIsRecording(true);
    setShouldShowOnBoarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-stone-700 p-5 text-left flex flex-col gap-3 outline-none hover:ring-2 hover:ring-stone-600 duration-200 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm text-stone-200 font-medium">
          Adicionar nota
        </span>
        <p className="text-sm text-stone-400 leading-6">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50 " />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-stone-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-stone-800 p-1.5 text-stone-400 hover:text-stone-100 duration-200">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm text-stone-200 font-medium">
                Adicionar nota
              </span>

              {shouldShowOnBoarding ? (
                <p className="text-sm text-stone-400 leading-6">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline duration-200"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline duration-200"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="bg-transparent text-sm leading-6 text-stone-400 resize-none flex-1 outline-none"
                  onChange={(e) => handleContentChanged(e)}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 py-4 text-center text-sm text-stone-300 font-medium hover:text-stone-100 duration-200"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse"></div>
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => handleSaveNote(e)}
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium hover:bg-lime-500 duration-200"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
