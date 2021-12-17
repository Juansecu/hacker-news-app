/* ------ Third-party libraries ------ */
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* ------ Services ------ */
import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: HackerNewsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HackerNewsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getNewsSortedByDate should get news sorted by date', () => {
    const query = 'angular';
    const page = 1;

    httpClientSpy.get.and.returnValue(
      new Observable(observer => {
        observer.next({
          hits: [
            {
              created_at: '2019-01-01T00:00:00.000Z',
              title: 'Angular',
              url: 'https://angular.io/',
              author: 'angular',
              points: 1,
              story_text: null,
              comment_text: null,
              num_comments: 0,
              story_id: null,
              story_title: null,
              story_url: null,
              parent_id: null,
              created_at_i: 1546300800,
              _tags: null,
              objectID: '1',
              _highlightResult: {
                author: {
                  value: 'angular',
                  matchLevel: 'none',
                  matchedWords: []
                },
                comment_text: {
                  value: null,
                  matchLevel: 'none',
                  fullyHighlighted: false,
                  matchedWords: []
                },
                story_title: {
                  value: null,
                  matchLevel: 'none',
                  matchedWords: []
                }
              }
            }
          ],
          nbHits: 1,
          page: 1,
          nbPages: 1,
          hitsPerPage: 20,
          exhaustiveNbHits: true,
          exhaustiveTypo: true,
          query: 'angular',
          params: 'query=angular',
          renderingContent: {},
          processingTimeMS: 0
        });
      })
    );

    service.getNewsSortedByDate(query, page).subscribe(news => {
      expect(news).toBeTruthy();
      expect(news.hits).toHaveSize(1);
      expect(news.hits.length).toEqual(news.nbHits);
    });
  });
});
