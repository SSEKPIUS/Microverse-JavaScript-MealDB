/** @jest-environment jsdom */
import updateCounter from '../modules/countComments';

describe('item comment count', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
        <div class="comments-div">
              
        </div>
        `;
  });

  const createCommentHtml = ({ creationDate, username, comment }) => {
    const commentSpan = document.createElement('span');
    commentSpan.className = 'comment-sp';
    commentSpan.innerText = `
            ${creationDate} ${username}: ${comment}  
          `;
    return commentSpan;
  };

  const comments = [
    {
      creationDate: '08/12/2022',
      username: 'lizo',
      comment: 'nice',
    },
    {
      creationDate: '08/12/2022',
      username: 'me',
      comment: 'sweet',
    },
  ];

  test('get comment count on the dom', () => {
    const showComment = () => {
      const commentDiv = document.querySelector('.comments-div');
      comments.forEach((comment) => {
        commentDiv.append(createCommentHtml(comment));
      });
    };
    showComment();

    const result = updateCounter();

    expect(result).toBe(2);
  });
});