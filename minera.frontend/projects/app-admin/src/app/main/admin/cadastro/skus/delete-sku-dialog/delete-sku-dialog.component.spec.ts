import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSkuDialogComponent } from './delete-sku-dialog.component';

describe('DeleteSkuDialogComponent', () => {
  let component: DeleteSkuDialogComponent;
  let fixture: ComponentFixture<DeleteSkuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSkuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSkuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
