import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInsumoComponent } from './delete-insumo.component';

describe('DeleteInsumoComponent', () => {
  let component: DeleteInsumoComponent;
  let fixture: ComponentFixture<DeleteInsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteInsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
