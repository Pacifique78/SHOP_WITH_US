import path from 'path';

const renderHtml = (req, res) =>
  res.sendfile(path.join(__dirname, 'templates/render/password.html'));
export default renderHtml;
