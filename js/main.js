const mockVideos = [
  {
    id: 1,
    src: ['/assets/videos/every-night.mp4'],
    comments: [
      {
        id: 1,
        content: 'Damn this sounds amazing',
        user: {
          name: 'Perfect',
          avatarPath: '/assets/images/perfect.jpg',
        }
      }
    ]
  },
  {
    id: 2,
    src: ['/assets/videos/last-hero.mp4'],
    comments: [
      {
        id: 1,
        content: 'I love Kino and Victor Coy, especially Last Hero (Posledniy Geroy) track!',
        user: {
          name: 'Perfect',
          avatarPath: '/assets/images/perfect.jpg',
        }
      }
    ]
  },
  {
    id: 3,
    src: ['/assets/videos/childhood.mp4'],
    comments: [
      
    ]
  }
]

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('user')) {
    const user = {
      name: null,
      avatarPath: null
    }
  
    while (!user.name) {
      user.name = prompt('Enter your name. Required!')
    }
    user.avatarPath = prompt('Enter avatar path if you want. (If you want to update your avatar in future - You have to clear localStorage')

    localStorage.setItem('user', JSON.stringify(user))
  }


  if (!localStorage.getItem('videos')) {
    localStorage.setItem('videos', JSON.stringify(mockVideos))
  } 
  const videos = JSON.parse(localStorage.getItem('videos'))


  videos.forEach(video => {
    new Video({
      data: video,
      parentElement: document.querySelector('.container'),
      classNames: ['cinema__video']
    }).render()
  })
})