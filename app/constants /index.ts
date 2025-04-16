export const adminSideBarLinks = [
  {
    img: '/icons/admin/home.svg',
    route: '/admin',
    text: 'Home',
  },
  {
    img: '/icons/admin/users.svg',
    route: '/admin/users',
    text: 'All Users',
  },
  {
    img: '/icons/admin/book.svg',
    route: '/admin/books',
    text: 'All Books',
  },
  {
    img: '/icons/admin/bookmark.svg',
    route: '/admin/book-requests',
    text: 'Borrow Requests',
  },
  {
    img: '/icons/admin/user.svg',
    route: '/admin/account-requests',
    text: 'Account Requests',
  },
]

export const navLinks = [
  {
    route: '/',
    text: 'Home',
  },
  {
    route: '/books',
    text: 'See All Books',
  },

  {
    route: '/my-profile',
    text: 'Profile',
  },
]

export const FIELD_NAMES = {
  fullName: 'Full name',
  email: 'Email',
  password: 'Password',
}

export const FIELD_TYPES = {
  fullName: 'text',
  email: 'email',
  password: 'password',
}
