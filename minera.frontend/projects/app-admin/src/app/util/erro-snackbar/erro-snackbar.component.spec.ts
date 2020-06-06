import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroSnackbarComponent } from './erro-snackbar.component';

describe('ErroSnackbarComponent', () => {
  let component: ErroSnackbarComponent;
  let fixture: ComponentFixture<ErroSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErroSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
