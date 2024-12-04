import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PropTypes from 'prop-types'

export function ImageSlider({ images, autoPlay = true }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  const autoPlayCallback = useCallback(() => {
    if (!emblaApi) return
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext()
    } else {
      emblaApi.scrollTo(0)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!autoPlay) return

    const intervalId = setInterval(autoPlayCallback, 3000)

    return () => clearInterval(intervalId)
  }, [autoPlay, autoPlayCallback])

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">No hay imágenes para mostrar</div>
  }

  return (
    <div className="relative px-4 md:px-0">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_25%] min-w-0 pl-4">
              <img
                src={src}
                alt={`Escultura ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className={`absolute top-1/2 left-0 md:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full ${
          !prevBtnEnabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className={`absolute top-1/2 right-0 md:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full ${
          !nextBtnEnabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  autoPlay: PropTypes.bool
}

