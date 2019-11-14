export class SizeDialog {
    constructor(
        public width360px: string,
        public heigth360px: string,
        public width480px?: string,
        public heigth480px?: string,
        public width768px?: string,
        public heigth768px?: string,
        public width1024px?: string,
        public heigth1024px?: string,
        public width1280px?: string,
        public heigth1280px?: string,
        public width1440px?: string,
        public heigth1440px?: string,
    ) {
        this.width480px = this.width480px ? this.width480px : this.width360px;
        this.heigth480px = this.heigth480px ? this.heigth480px : this.heigth360px;

        this.width768px = this.width768px ? this.width768px : this.width360px;
        this.heigth768px = this.heigth768px ? this.heigth768px : this.heigth360px;

        this.width1024px = this.width1024px ? this.width1024px : this.width360px;
        this.heigth1024px = this.heigth1024px ? this.heigth1024px : this.heigth360px;

        this.width1280px = this.width1280px ? this.width1280px : this.width360px;
        this.heigth1280px = this.heigth1280px ? this.heigth1280px : this.heigth360px;

        this.width1440px = this.width1440px ? this.width1440px : this.width360px;
        this.heigth1440px = this.heigth1440px ? this.heigth1440px : this.heigth360px;
    }
}