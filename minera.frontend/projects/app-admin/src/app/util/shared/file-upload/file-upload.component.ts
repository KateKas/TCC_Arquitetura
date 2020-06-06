import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    AfterContentChecked,
    AfterViewInit
} from "@angular/core";

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.component.html",
    styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent implements AfterViewInit {
    constructor() {}
    @Input() title: string;
    @Input() url: string;
    @Output() getFile = new EventEmitter();
    @Output() getUrl = new EventEmitter();
    @ViewChild("blob", { static: false }) blob: ElementRef;
    @ViewChild("form", { static: false }) form: ElementRef;
    imageUrl;

    ngAfterViewInit() {
        if (this.url) {
            this.imageUrl = this.url;
            this.blob.nativeElement.src = this.imageUrl;
        }
    }

    ngAfterContentChecked(): void {
        if (this.url && !this.imageUrl) {
            this.imageUrl = this.url;
            this.blob.nativeElement.src = this.imageUrl;
        }
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.size / 1000 > 15360) {
                return;
            }
            this.upload(file);
        }
    }

    upload(file) {
        const reader = new FileReader();
        let fileToUpload: File;
        fileToUpload = file;
        reader.onload = () => {
            var url = reader.result;
            this.imageUrl = url;
            this.blob.nativeElement.src = this.imageUrl;
            this.getUrl.emit(url);
        };
        reader.readAsDataURL(fileToUpload);

        this.emit(fileToUpload);
    }

    emit(file) {
        this.getFile.emit(file);
    }
}
