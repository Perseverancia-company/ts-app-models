# User

A cool feature of separating authentication from a user is that it makes it optional, now you can add people to the table as if they are clients of a CRM.

The only problem with this, is that you may need to perform many sql requests

A better implementation of a user would be like this.

## Person

- [ ] 'person' table

With these fields:
- name
- surname
- birthday
- gender
- governmentId

Identification document id

- [x] 'user-contact-methods'

Belongs to 'person'

## Account

A person can have multiple 'accounts' but they all belong to the same person.

- [ ] 'account'

Account information

Fields:
- email(Obligatory main email)

Belongs to 'person'

- [ ] 'password' table

For actions that require authentication

Belongs to 'account'

- [ ] Public profile('profile')

This one stores miscellaneous things like:
- Profile picture
- Username

Belongs to 'account'

- [ ] 'user-token'

For handling tokens.

A good security measure is to have one token at a time

Fields
- Token
- Expiration

Belongs to 'account'
