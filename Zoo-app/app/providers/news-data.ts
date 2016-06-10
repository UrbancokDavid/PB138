import {Injectable} from '@angular/core';
import {DataProvider} from '../common/data-provider';


@Injectable()
export class NewsData {
  news: any;
  news_map: any;
  keys = {
    news: 'news'
  };

  constructor(private provider: DataProvider) {}

  loadNews(force) {
    if (!force && this.news) {
      return Promise.resolve(this.news);
    }
    return this.provider.get('news');
  }

  getAllNews(force) {
  return this.loadNews(force).then((data: any) => {
      this.news = data;
      var map = {};
      data.forEach(item => {
        map[item['id']] = item;
      });
      this.news_map = map;
      return this.news;
    });
  }

  getNewsById(id: string) {
    if (id in this.news_map) {
      return Promise.resolve(this.news_map[id]);
    }

    this.provider.get('news/' + id).then(data => {
      this.news.push(data);
      this.news_map[data['id']] = data;
      return data;
    });
  }

  flushCache() {
    this.news = null;
    this.news_map = {};
  }

  getCachedIds() {
    var ids = [];
    this.news.forEach(item => {
      ids.push(item.id);
    });
    return ids;
  }
}
