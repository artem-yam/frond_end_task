function Notification(id, text, type, date) {
    const DEFAULT_DATE = new Date();

    this.id = id;
    this.text = text;
    this.type = type;

    this.date = date || DEFAULT_DATE;
}

