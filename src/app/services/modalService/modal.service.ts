import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: NgbModal,
  ) { }
  openLg(content: any): void {
    this.modalService.open(content, { size: 'lg' });
  }

  openXl(content){
    return this.modalService.open(content, { size : 'xl' })
  }
}
