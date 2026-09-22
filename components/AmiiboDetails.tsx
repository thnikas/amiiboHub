"use client";
import { Fragment, useState } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { amiiboProps } from "@/types";
import CustomButton from "./CustomButton";
import { AmiiboDetailsData } from "@/constants";

interface amiiboDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  amiibo: amiiboProps;
}

const AmiiboDetails = ({ isOpen, closeModal, amiibo }: amiiboDetailsProps) => {
  const [hover, setHover] = useState(false);

  const formatDate = (date?: string | null) => {
    if (!date) return "Not announced";

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const description = AmiiboDetailsData.find(
    (item) => item.name === amiibo.name,
  );
  const platformGroups = [
    { name: "Nintendo Switch 2", games: amiibo.gamesSwitch2 ?? [] },
    { name: "Nintendo Switch", games: amiibo.gamesSwitch ?? [] },
    { name: "Nintendo 3DS", games: amiibo.games3DS ?? [] },
    { name: "Wii U", games: amiibo.gamesWiiU ?? [] },
  ].filter((platform) => platform.games.length > 0);

  function searchOnAmazon() {
    const title = `${amiibo.name} Amiibo`;
    const encodedTitle = encodeURIComponent(title);
    window.open(`https://www.amazon.com/s?k=${encodedTitle}`, "_blank");
  }

  const toggleButton = () => {
    setHover(!hover);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/35" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative max-h-[90vh] w-full max-w-4xl transform overflow-y-auto rounded-2xl bg-white text-left shadow-xl transition-all">
                <button
                  type="button"
                  className="absolute right-2 top-2 z-10 w-fit rounded-full bg-primary-blue-100 p-2"
                  onClick={closeModal}
                  aria-label="Close details"
                >
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </button>

                <div className="m-6 flex flex-col gap-6 sm:m-8 md:m-10 ">
                  <div className="grid items-center gap-6 md:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)]">
                    <div className="relative min-h-[280px] w-full rounded-xl md:min-h-[420px]">
                      <Image
                        src={amiibo.imgwebp ?? amiibo.image}
                        alt={`${amiibo.name ?? "Amiibo"} model`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-contain p-6"
                      />
                    </div>

                    <div className="flex flex-col gap-5">
                      <div>
                        <Dialog.Title className="text-3xl font-bold">
                          {amiibo.name}
                        </Dialog.Title>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          {description?.des ??
                            "No character description is available."}
                        </p>
                      </div>

                    <div className="card-contain">
                        <h3 className="mb-4 text-lg font-semibold">
                          Amiibo information
                        </h3>
                        <dl className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                          <div className="rounded-lg p-3">
                            <dt className="text-sm font-semibold">Character</dt>
                            <dd className="text-sm">
                              {amiibo.character ?? "Unknown"}
                            </dd>
                          </div>
                          <div className="rounded-lg p-3">
                            <dt className="text-sm font-semibold">Type</dt>
                            <dd className="text-sm">
                              {amiibo.type ?? "Unknown"}
                            </dd>
                          </div>
                          <div className="rounded-lg p-3">
                            <dt className="text-sm font-semibold">
                              Game series
                            </dt>
                            <dd className="text-sm">
                              {amiibo.gameSeries ?? "Unknown"}
                            </dd>
                          </div>
                          <div className="rounded-lg p-3">
                            <dt className="text-sm font-semibold">
                              Amiibo series
                            </dt>
                            <dd className="text-sm">
                              {amiibo.amiiboSeries ?? "Unknown"}
                            </dd>
                          </div>
                          <div className="rounded-lg p-3 sm:col-span-2">
                            <dt className="text-sm font-semibold">
                              European release date
                            </dt>
                            <dd className="text-sm">
                              {formatDate(amiibo.release?.eu)}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>

                <section className="card-contain">
                    <h3 className="mb-3 text-xl font-semibold">
                      Compatible games
                    </h3>
                    {platformGroups.length > 0 ? (
                      <div className="flex flex-col gap-5">
                        {platformGroups.map((platform) => (
                          <div key={platform.name}>
                            <h4 className="mb-2 font-bold">{platform.name}</h4>
                            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                              {platform.games.map((game, gameIndex) => (
                                <li
                                  key={`${platform.name}-${game.gameName}-${gameIndex}`}
                                  className="rounded-lg p-4"
                                >
                                  <p className="font-semibold">
                                    {game.gameName}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">
                        No compatible games are listed for this Amiibo.
                      </p>
                    )}
                  </section>

                  <div
                    className={`card-flip ${hover ? "card-flip--flipped" : ""}`}
                  >
                    <div className="card-flip__inner">
                      <div className="card-flip__face">
                        <CustomButton
                          title="Buy now"
                          containerStyles="w-full py-[16px] rounded-2xl bg-orange-500"
                          textStyles="text-white text-[14px] leading-[17px] font-bold"
                          rightIcon="/right-arrow.svg"
                          handleMouseIn={toggleButton}
                        />
                      </div>
                      <div className="card-flip__face card-flip__back">
                        <CustomButton
                          title="Go to Amazon"
                          containerStyles="w-full py-[16px] rounded-2xl bg-gray-800"
                          textStyles="text-white text-[14px] leading-[17px] font-bold"
                          handleClick={searchOnAmazon}
                          rightIcon="/amazon2.svg"
                          handleMouseOut={toggleButton}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AmiiboDetails;
