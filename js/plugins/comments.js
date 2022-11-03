const Plugin = videojs.getPlugin('plugin')

class CommentsPlugin extends Plugin {
  constructor(player, options) {
    super(player, options)

    this.options = options
    this.elements = this.render()
  }


  addComment = (comment) => {
    // * Save somewhere (localStorage)
    this.options.handleAddComment(comment)

    // * Display in List
    const commentElement = this.createCommentElement(comment)
    this.elements.listElement.prepend(commentElement)
  }
  
  
  /** @private */
  render = () => {
    const commentsElement = document.createElement('div')
    commentsElement.classList.add('video__comments')
    
    const formElement = this.createFormElement()
    const listElement = this.createListElement(this.options.data)
    
    commentsElement.append(formElement)
    commentsElement.append(listElement)
    
    this.options.parentElement.append(commentsElement)
    
    return { formElement, listElement }
  }
  
  
  /** @private */
  createFormElement = () => {
    // * Input 
    const inputElement = document.createElement('input')
    inputElement.type = 'text'
    inputElement.placeholder = 'Write your beautiful comment ✨'
    
    // * Form
    const formElement = document.createElement('form')
    formElement.classList.add('video__comments-form')
    
    // * Form submit listener
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()

      const comment = {
        id: Date.now(),
        content: inputElement.value,
        user: JSON.parse(localStorage.getItem('user')),
      };

      this.addComment(comment)

      formElement.reset()
    })
    
    formElement.append(inputElement)
    
    return formElement
  }
  
  /** @private */
  createListElement = (comments) => {
    const listElement = document.createElement('div')
    listElement.classList.add('video__comments-list')
    
    comments.map(comment => {
      const commentElement = this.createCommentElement(comment)
      
      listElement.append(commentElement)
    })
    
    return listElement
  }
  
  /** @private */
  createCommentElement = (comment) => {
    const commentElement = document.createElement('div')
    commentElement.classList.add('comment')
    commentElement.innerHTML = `
      <div class="comment__avatar">
        <img src="${comment.user.avatarPath}" alt="${comment.user.name}">
      </div>
      
      <div class="comment__info">
        <h3 class="comment__info-name">${comment.user.name}</h3>
        <p class="comment__info-content">${comment.content}</p>
      </div>
    `
  
    return commentElement
  }
}

videojs.registerPlugin('comments', CommentsPlugin)