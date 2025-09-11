import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { InstrumentItemComponent } from './instrument-item-component';

describe('InstrumentItemComponent', () => {
  let component: InstrumentItemComponent;
  let fixture: ComponentFixture<InstrumentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentItemComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
