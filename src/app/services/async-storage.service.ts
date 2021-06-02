import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsyncStorageService {

  constructor() { }

  public query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [];
    return Promise.resolve(entities);
  }
  public get(entityType, entityId) {
    return this.query(entityType).then((entities) => entities.find((entity) => entity._id === entityId));
  }
  public post(entityType, newEntity) {
    newEntity._id = this._makeId();
    return this.query(entityType).then((entities) => {
      entities.push(newEntity);
      this._save(entityType, entities);
      return newEntity;
    });
  }
  public postMany(entityType, newEntities) {
    return this.query(entityType).then((entities) => {
      newEntities = newEntities.map((entity) => ({ ...entity, _id: this._makeId() }));
      entities.push(...newEntities);
      this._save(entityType, entities);
      return entities;
    });
  }
  public put(entityType, updatedEntity) {
    return this.query(entityType).then((entities) => {
      const idx = entities.findIndex((entity) => entity._id === updatedEntity._id);
      entities.splice(idx, 1, updatedEntity);
      this._save(entityType, entities);
      return updatedEntity;
    });
  }
  public remove(entityType, entityId) {
    return this.query(entityType).then((entities) => {
      const idx = entities.findIndex((entity) => entity._id === entityId);
      entities.splice(idx, 1);
      this._save(entityType, entities);
    });
  }
  public _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
  }
  public _makeId(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
