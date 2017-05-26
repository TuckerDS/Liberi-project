import * as _ from 'lodash';

export class Event {
  _id: string;
  userId: string; //Cambiar a objeto user
  title: string;
  category: string;
  description: string;
  location: string;
  permanent: boolean;
  startDate: Date;
  endDate: Date;
  picture: string;

  constructor ({ _id, userId, title, category, description, location, permanent, startDate, endDate, picture }) {
        this._id = _id;
        this.userId = userId;
        this.title = title;
        this.category = category;
        this.description = description;
        this.location = location;
        this.permanent = permanent;
        this.startDate = startDate;
        this.endDate = endDate;
        this.picture = picture;
    }
}
