import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaselistComponent } from './releaselist.component';

describe('ReleaselistComponent', () => {
  let component: ReleaselistComponent;
  let fixture: ComponentFixture<ReleaselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaselistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
