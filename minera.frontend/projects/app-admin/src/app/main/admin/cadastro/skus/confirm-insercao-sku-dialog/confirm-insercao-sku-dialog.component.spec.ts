import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInsercaoSkuDialogComponent } from './confirm-insercao-sku-dialog.component';

describe('ConfirmInsercaoSkuDialogComponent', () => {
  let component: ConfirmInsercaoSkuDialogComponent;
  let fixture: ComponentFixture<ConfirmInsercaoSkuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmInsercaoSkuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInsercaoSkuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
