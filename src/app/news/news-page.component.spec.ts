import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { NewsPageComponent } from './news-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewsPageComponent', () => {
  let component: NewsPageComponent;
  let fixture: ComponentFixture<NewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule]
    }).createComponent(NewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addToFavorites should add news to favorites', () => {
    const news = {
      story_title: 'Angular',
      author: 'angular',
      story_url: 'https://angular.io/',
      created_at: '2019-01-01T00:00:00.000Z'
    };

    component.addToFavorites(news);

    expect(JSON.parse(localStorage.getItem('favoriteNews')!).length).toEqual(1);

    localStorage.removeItem('favoriteNews');

    expect(localStorage.getItem('favoriteNews')).toEqual(null);
  });

  it('#getNewsFilter should get news filter', () => {
    const newsFilter = 'angular';

    localStorage.setItem('newsFilter', newsFilter);

    expect(component.getNewsFilter()).toEqual(newsFilter);
  });

  it('#getNewsFilterSelect should get news filter select', () => {
    expect(component.getNewsFilterSelect()).not.toBe(null);
  });

  it('#onChangeNewsFilter should change news filter', () => {
    const htmlSelectElement = component.getNewsFilterSelect()!;

    htmlSelectElement.value = 'vuejs';
    htmlSelectElement.dispatchEvent(new Event('change'));

    component.onChangeNewsFilter(htmlSelectElement);

    expect(component.getNewsFilter()).toEqual('vuejs');
  });
});
