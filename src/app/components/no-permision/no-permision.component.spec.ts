import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPermisionComponent } from './no-permision.component';

describe('NoPermisionComponent', () => {
  let component: NoPermisionComponent;
  let fixture: ComponentFixture<NoPermisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPermisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPermisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
