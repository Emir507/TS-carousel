class Carousel {
  private container: HTMLUListElement | null = null;
  private indicators: HTMLUListElement | null = null;
  private currentPosition: number = 0;
  private carouselWidth: number = 500;
  private carouselMaxWidth: number = 600;
  private images: string[];
  constructor(images: string[]) {
    this.images = images;
    this.init();
    this.renderIndicators(0);
  }

  private init(): void {
    // carousel
    const carousel = document.getElementById("my-carousel");
    if (carousel) {
      carousel.innerHTML = "";
      carousel.style.width = `${this.carouselWidth}px`;
      carousel.style.maxWidth = `${this.carouselMaxWidth}px`;
    }
    const carouselContainer = document.createElement("div");
    carouselContainer.className = "my-carousel__container mb-3";

    const carouselContent = document.createElement("div");
    carouselContent.className = "my-carousel__content";

    const carouselList = document.createElement("ul");
    carouselList.className = "my-carousel__list";
    this.container = carouselList;

    const controlBtnLeft = document.createElement("div");
    controlBtnLeft.className =
      "control-button control-button__left align-items-center p-2";
    const iconLeftContainer = document.createElement("div");
    iconLeftContainer.className = "control-button--left";
    const iconLeft = document.createElement("i");
    iconLeft.className = "fa-solid fa-left-long";
    iconLeftContainer.appendChild(iconLeft);
    controlBtnLeft.appendChild(iconLeftContainer);

    const controlBtnRight = document.createElement("div");
    controlBtnRight.className =
      "control-button control-button__right align-items-center p-2";
    const iconRightContainer = document.createElement("div");
    iconRightContainer.className = "control-button--right";
    const iconRight = document.createElement("i");
    iconRight.className = "fa-solid fa-right-long";
    iconRightContainer.appendChild(iconRight);
    controlBtnRight.appendChild(iconRightContainer);

    this.images.forEach((image) => {
      const li = document.createElement("li");
      li.className = "my-carousel__item";
      const img = document.createElement("img");
      img.setAttribute("src", image);
      li.appendChild(img);
      carouselList.appendChild(li);
    });

    carouselContent.appendChild(carouselList);

    carouselContainer.appendChild(carouselContent);
    carouselContainer.appendChild(controlBtnLeft);
    carouselContainer.appendChild(controlBtnRight);
    carousel?.appendChild(carouselContainer);

    // indicators
    const indicatorsContainer = document.createElement("div");
    const carouselIndicators = document.createElement("ul");
    carouselIndicators.className =
      "d-flex my-carousel__indicators justify-content-center";
    this.indicators = carouselIndicators;
    indicatorsContainer.appendChild(carouselIndicators);

    carousel?.appendChild(indicatorsContainer);

    const btnRight = document.querySelector(".control-button--right");
    const btnLeft = document.querySelector(".control-button--left");

    btnRight?.addEventListener("click", () => {
      this.moveRight();
    });

    btnLeft?.addEventListener("click", () => {
      this.moveLeft();
    });
  }

  private showCurrentSlide(): void {
    if (this.container) {
      this.container.style.transform = `translate(${this.currentPosition}px)`;
    }
  }

  private renderIndicators(activeIndex: number): void {
    if (this.indicators) {
      this.indicators.innerHTML = "";
    }
    if (this.container) {
      for (let i = 0; i < this.container.childElementCount; i++) {
        const li = document.createElement("li");
        li.className = "my-carousel__indicator";
        if (i === activeIndex) {
          li.classList.add("my-carousel__indicator--active");
        }
        li.setAttribute("key", String(i));
        this.indicators?.appendChild(li);
      }
      const indicators = document.querySelectorAll(".my-carousel__indicator");
      indicators?.forEach((indicator) => {
        indicator.addEventListener("click", (e) => {
          if (!indicator.classList.contains("my-carousel__indicator--active")) {
            changeBodyBgColor();
          }
          indicators?.forEach((el) => {
            el.classList.remove("my-carousel__indicator--active");
          });
          indicator.classList.add("my-carousel__indicator--active");
          const element = e.target as HTMLElement;
          this.currentPosition =
            Number(element?.getAttribute("key")) * this.carouselWidth * -1;

          this.showCurrentSlide();
        });
      });
    }
  }

  private renderActiveIndicator(): void {
    const activeIndex = Math.abs(this.currentPosition / this.carouselWidth);
    this.renderIndicators(activeIndex);
  }

  moveRight(): void {
    if (this.container) {
      if (
        this.currentPosition ===
        (this.container.childElementCount - 1) * this.carouselWidth * -1
      ) {
        this.currentPosition = 0;
      } else {
        this.currentPosition -= this.carouselWidth;
      }
      this.renderActiveIndicator();
      this.showCurrentSlide();
      changeBodyBgColor();
    }
  }

  moveLeft(): void {
    if (this.container) {
      if (this.currentPosition === 0) {
        this.currentPosition =
          (this.container.childElementCount - 1) * this.carouselWidth * -1;
      } else {
        this.currentPosition += this.carouselWidth;
      }
      this.renderActiveIndicator();
      this.showCurrentSlide();
      changeBodyBgColor();
    }
  }

  setWidth(width: number): void {
    if (width > this.carouselMaxWidth) {
      this.carouselWidth = this.carouselMaxWidth;
    } else {
      this.carouselWidth = width;
    }
    this.init();
    this.renderIndicators(0);
  }

  addImage(imageSrc: string): void {
    this.images.push(imageSrc);
    const li = document.createElement("li");
    li.className = "my-carousel__item";
    const img = document.createElement("img");
    img.setAttribute("src", imageSrc);
    li.appendChild(img);
    this.container?.appendChild(li);

    this.renderActiveIndicator();
  }

  addImages(imagesPath: string[]): void {
    this.images.push(...imagesPath);
    imagesPath.forEach((imageSrc) => {
      const li = document.createElement("li");
      li.className = "my-carousel__item";
      const img = document.createElement("img");
      img.setAttribute("src", imageSrc);
      li.appendChild(img);
      this.container?.appendChild(li);
    });

    this.renderActiveIndicator();
  }
}
function changeBodyBgColor() {
  const mainWrapper = document.querySelector(".wrapper") as HTMLDivElement;
  const currentColor = mainWrapper.style.backgroundColor;
  const colors = [
    "rgb(218, 103, 103)",
    "rgb(245, 156, 255)",
    "rgb(88, 205, 255)",
    "rgb(88, 255, 224)",
    "rgb(143, 251, 143)",
  ];

  const getRandomColorIndex = (random: number): number =>
    Math.floor(random * colors.length);
  let randomIndex = getRandomColorIndex(Math.random());
  while (colors[randomIndex] === currentColor) {
    randomIndex = getRandomColorIndex(Math.random());
  }
  mainWrapper.style.backgroundColor = colors[randomIndex];
}

export default Carousel;
