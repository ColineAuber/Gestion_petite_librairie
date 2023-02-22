export default class Livre {
  constructor(titre, qtestock, prix, id) {
    this.id = id;
    this._titre = titre;
    this._qtestock = qtestock;
    this._prix = prix;
  }

  get titre() {
    return this._titre;
  }

  get qtestock() {
    return this._qtestock;
  }

  get prix() {
    return this._prix;
  }

  get pourAfficher() {
    return ` ${this._titre} coûte ${this._prix}€, il en reste ${this._qtestock}`;
  }

  add1l() {
    this._qtestock = this._qtestock + 1;
  }

  delete1() {
    this._qtestock = this._qtestock - 1;
  }
}
