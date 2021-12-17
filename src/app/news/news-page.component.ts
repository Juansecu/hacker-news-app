/* ------ Third-party libraries ------ */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';

/* ------ Interfaces ------ */
import { Hit, NewsResponse } from './typings/New';

/* ------ Services ------ */
import { HackerNewsService } from '../core/services/hacker-news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  currentPage: number = 0;
  errorMessage: string | null = null;
  infiniteScrollDisabled: boolean = true;
  news: Hit[] = [];
  newsFilterQuery: string | null = null;
  pageSize: number = 0;

  constructor(
    private readonly _HACKER_NEWS_SERVICE: HackerNewsService,
    private readonly _ROUTER: Router
  ) {}

  ngOnInit(): void {
    if (this._ROUTER.url == '/news/faves') {
      const favoriteNews: string | null = localStorage.getItem('favoriteNews');

      if (favoriteNews) {
        this.news = JSON.parse(favoriteNews);
        return;
      }

      this.errorMessage = 'You have no favorite news yet.';
    } else {
      this.infiniteScrollDisabled = false;

      const $newsFilterSelect: HTMLSelectElement | null =
        this.getNewsFilterSelect();

      if ($newsFilterSelect) {
        let newsFilterValue: string | null = $newsFilterSelect.value;

        this.newsFilterQuery = this.getNewsFilter();

        if (!this.newsFilterQuery) {
          this.newsFilterQuery = newsFilterValue;
          localStorage.setItem('newsFilter', newsFilterValue);
        }

        $newsFilterSelect.value = this.newsFilterQuery;

        this._HACKER_NEWS_SERVICE
          .getNewsSortedByDate(this.newsFilterQuery, 0)
          .subscribe({
            next: (news: NewsResponse) => {
              this.pageSize = news.nbPages;
              this.news = news.hits.filter(
                item =>
                  item.story_title &&
                  item.story_url &&
                  item.author &&
                  item.created_at
              );
            },
            error: error => {
              console.log(error);
              this.errorMessage = 'Error loading news.';
            }
          });
      }
    }
  }

  /**
   * Add tech news to favorites.
   *
   * @param {Hit} item Tech news item.
   * @param {number} index Index of tech news item.
   * @returns void
   */
  addToFavorites(item: Hit, index: number = -1): void {
    const favoriteNewsList: string | null =
      localStorage.getItem('favoriteNews');

    if (index > -1) {
      const button = document.querySelectorAll('.card__favorite-btn')[index];
      const newFavoriteImage = document.createElement('img');
      const oldFavoriteImage = button.getElementsByTagName('img')[0];

      newFavoriteImage.src = 'assets/images/iconmonstr-favorite-3.png';
      newFavoriteImage.alt = 'Favorite icon';

      button.replaceChild(newFavoriteImage, oldFavoriteImage);
    }

    if (favoriteNewsList) {
      const favoriteNews: Hit[] = JSON.parse(favoriteNewsList);

      favoriteNews.push(item);
      localStorage.setItem('favoriteNews', JSON.stringify(favoriteNews));

      return;
    }

    localStorage.setItem('favoriteNews', JSON.stringify([item]));
  }

  /**
   * Get news filter from local storage.
   * If there is no news filter in local storage,
   * return null.
   * @returns string | null
   */
  getNewsFilter(): string | null {
    return localStorage.getItem('newsFilter');
  }

  /**
   * Check if the check news filter select exist.
   *
   * @returns HTMLSelectElement | null
   */
  getNewsFilterSelect(): HTMLSelectElement | null {
    return document.querySelector('select#news-filter');
  }

  /**
   * Triggered when user change news filter.
   *
   * This method save news filter to local storage,
   * and reload news.
   *
   * @param {HTMLSelectElement} newsFilterSelect News filter select.
   * @returns void
   */
  onChangeNewsFilter(
    newsFilterSelect: HTMLSelectElement | EventTarget | null
  ): void {
    localStorage.setItem(
      'newsFilter',
      (newsFilterSelect as HTMLSelectElement).value
    );

    this._HACKER_NEWS_SERVICE
      .getNewsSortedByDate((newsFilterSelect as HTMLSelectElement).value, 0)
      .subscribe({
        next: (news: NewsResponse) => {
          this.pageSize = news.nbPages;
          this.news = news.hits.filter(
            item =>
              item.story_title &&
              item.story_url &&
              item.author &&
              item.created_at
          );
        }
      });
  }

  /**
   * This method is called when user scrolls to the bottom of the page.
   * It loads next page of news.
   *
   * @param {IInfiniteScrollEvent} event Infinite scroll event.
   * @returns void
   */
  onScrollDown(event: IInfiniteScrollEvent): void {
    const newsFilterQuery: string | null = this.getNewsFilter();

    this.currentPage++;
    this._HACKER_NEWS_SERVICE
      .getNewsSortedByDate(newsFilterQuery as string, this.currentPage)
      .subscribe({
        next: (news: NewsResponse) =>
          (this.news = this.news.concat(
            news.hits.filter(
              item =>
                item.story_title &&
                item.story_url &&
                item.author &&
                item.created_at
            )
          )),
        error: error => {
          console.log(error);
        }
      });
  }
}
