import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAtributoDialogComponent } from './delete-atributo-dialog.component';

describe('DeleteAtributoDialogComponent', () => {
  let component: DeleteAtributoDialogComponent;
  let fixture: ComponentFixture<DeleteAtributoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAtributoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAtributoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
