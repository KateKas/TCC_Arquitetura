import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRespostasSkuDialogComponent } from './edit-respostas-sku-dialog.component';

describe('EditRespostasSkuDialogComponent', () => {
  let component: EditRespostasSkuDialogComponent;
  let fixture: ComponentFixture<EditRespostasSkuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRespostasSkuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRespostasSkuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
