import { BehaviorSubject } from 'rxjs';

export default class GlobalStore {
    private static instance: GlobalStore;
    private _canvasCtx: BehaviorSubject<CanvasRenderingContext2D | undefined> = new BehaviorSubject(
        undefined
    );
    private _canvas: BehaviorSubject<HTMLCanvasElement | undefined> = new BehaviorSubject(
        undefined
    );
    private _videoSrc: BehaviorSubject<HTMLVideoElement | undefined> = new BehaviorSubject(
        undefined
    );

    private _cvLoaded: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

    private _isPlaying: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

    private _srcBlob: BehaviorSubject<string | undefined> = new BehaviorSubject(undefined);

    public static getInstance(): GlobalStore {
        if (!GlobalStore.instance) {
            GlobalStore.instance = new GlobalStore();
        }
        return GlobalStore.instance;
    }

    set isPlaying(playing: boolean) {
        if (!!this._isPlaying) {
            this._isPlaying = new BehaviorSubject(playing);
        } else {
            this._isPlaying.next(playing);
        }
    }

    get isPlaying() {
        return this._isPlaying.value;
    }

    get $isPlaying() {
        return this._isPlaying;
    }

    set cvLoaded(loaded: boolean) {
        if (!!this._cvLoaded) {
            this._cvLoaded = new BehaviorSubject(loaded);
        } else {
            this._cvLoaded.next(loaded);
        }
    }

    get cvLoaded() {
        return this._cvLoaded.value;
    }

    get $cvLoaded() {
        return this._cvLoaded;
    }

    private setCanvasCtx(ctx: CanvasRenderingContext2D) {
        if (!!this._canvasCtx && ctx) {
            this._canvasCtx = new BehaviorSubject(ctx);
        } else {
            this._canvasCtx.next(ctx);
        }
    }

    set srcBlob(srcBlob: string) {
        if (!this._srcBlob) {
            this._srcBlob = new BehaviorSubject(srcBlob);
        } else {
            this._srcBlob.next(srcBlob);
        }
    }
    get srcBlob() {
        return this._srcBlob.value;
    }

    get $srcBlob() {
        return this._srcBlob;
    }
    get canvasCtx() {
        return this._canvasCtx.value;
    }

    get $canvasCtx() {
        return this._canvasCtx;
    }

    set canvas(canvas: HTMLCanvasElement | null) {
        if (!!this._canvasCtx && canvas) {
            this._canvas = new BehaviorSubject(canvas);
            this.setCanvasCtx(canvas.getContext('2d'));
        } else {
            this._canvas.next(canvas);
        }
    }

    get canvas() {
        return this._canvas.value;
    }

    get $canvas() {
        return this._canvas;
    }

    get $videoSrc(): BehaviorSubject<HTMLVideoElement> {
        return this._videoSrc;
    }

    get videoSrc(): HTMLVideoElement {
        return this._videoSrc.value;
    }

    set videoSrc(src: HTMLVideoElement) {
        if (src !== undefined) {
            if (this._videoSrc === undefined) {
                this._videoSrc = new BehaviorSubject(src);
            } else {
                this._videoSrc.next(src);
            }
        }
    }
}
