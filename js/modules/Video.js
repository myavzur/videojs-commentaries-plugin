/** 
 * Creates Video.
 * Make sure that you are call .render() method 
 * if you want it to be displayed in your {parentElement}
 * @param {Video} data
 * @param {HTMLElement} parentElement
 */
class Video {
  constructor({data, parentElement, classNames}) {
    this.data = data,
    this.parentElement = parentElement
    this.classNames = classNames

    this.elements = null // render() will place it with {player, playeelementsent}
  }

  /** @public 
   * * Add new comment of current Video to localStorage
  */
  handleAddComment = (comment) => {
    const videos = JSON.parse(localStorage.getItem('videos'))

    const idx = videos.findIndex(video => video.id === this.data.id)
    videos[idx].comments = [
      comment,
      ...videos[idx].comments
    ]
    
    localStorage.setItem('videos', JSON.stringify(videos))
  }


  /** @public Renders video on page inside of {parentElement}
   * @example
   * * <div class="video {classNames}">
   * *   <video class="video-js vjs-theme-forest" controls>
   * *     {data.src.map(src) => {
   * *       return <source src={src}/>
   * *     }}
   * *   </video>
   * * </div>
   * @returns player: VideoJS.PlayerAPI (I guess so...),
   * @returns playerElement: HTMLElement<Video>
   */
  render = () => {
    // * <video/>
    const playerElement = this.createPlayerElement(this.data)

    // * <div class="video {classNames}"/>
    const playerWrapperElement = this.createPlayerWrapperElement()
    playerWrapperElement.append(playerElement)

    // * Insert <playerWrapperElement/> to <parentElement/>
    this.parentElement.append(playerWrapperElement)


    // * Set state
    this.elements = {
      player: videojs(playerElement, {
        plugins: {
          comments: {
            data: this.data.comments,
            handleAddComment: this.handleAddComment,
            parentElement: playerWrapperElement
          }
        }
      }),
      playerWrapperElement,
      playerElement
    }

    this.bindPlayerEventListeners()
  }

  /** @private */
  createPlayerElement = () => {
    // * Create <video class="video-js vjs-theme-forest" controls />
    const playerElement = document.createElement('video')
    playerElement.classList.add('video-js', 'vjs-theme-forest')
    playerElement.controls = true

    // * Insert <source src={src}/> inside of <playerElement/>
    this.data.src.forEach(src => {
      const sourceElement = document.createElement('source')
      sourceElement.src = src

      playerElement.append(sourceElement)
    })

    return playerElement
  }

  /** @private */
  createPlayerWrapperElement = () => {
    const playerWrapperElement = document.createElement('div')
    playerWrapperElement.classList.add('video')

    if (this.classNames) {
      this.classNames.forEach(className => {
        playerWrapperElement.classList.add(className)
      })
    }

    return playerWrapperElement
  }

  bindPlayerEventListeners = () => {
    this.elements.player.on('playing', () => {
      this.elements.playerWrapperElement.classList.add('video--playing')
    })

    this.elements.player.on('pause', () => {
      this.elements.playerWrapperElement.classList.remove('video--playing')
    })
  }
}