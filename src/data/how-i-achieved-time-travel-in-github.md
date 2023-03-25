# How I achieved time travel in GitHub

I was basically roaming around GitHub, updating my profile overview README section. I saw my contributions and it was segregated into years. Like, I started in 2021. So, it showed 2021, 2022, and 2023. And this strikes my mind with an experiment.

Whenever we commit, git keeps a snapshot of the project with timestamps. And when we push, GitHub calculates the time of COMMIT rather than the time to PUSH. If I could somehow change my time of COMMIT, I could easily fool GitHub, or I thought so.

I researched a bit and came up with 2 possible solutions.

* The first was changing my system timing to something back in time. But I did not want to mess up with system timings and time zones.
    
* The second was to fool git itself. If I commit, the second step at GitHub is already evident. And after a bit of documentation, I realized I don’t even need to fool it. Git provides inbuilt functionality of ENVIRONMENT VARIABLES. Checkout at [https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables)
    

I read through it and came across these lines.

> **Committing**
> 
> The final creation of a Git commit object is usually done by `git-commit-tree`, which uses these environment variables as its primary source of information, falling back to configuration values only if these aren’t present.
> 
> `GIT_AUTHOR_NAME` is the human-readable name in the “author” field.
> 
> `GIT_AUTHOR_EMAIL` is the email for the “author” field.
> 
> `GIT_AUTHOR_DATE` is the timestamp used for the “author” field.
> 
> `GIT_COMMITTER_NAME` sets the human name for the “committer” field.
> 
> `GIT_COMMITTER_EMAIL` is the email address for the “committer” field.
> 
> `GIT_COMMITTER_DATE` is used for the timestamp in the “committer” field.
> 
> `EMAIL` is the fallback email address in case the [`user.email`](http://user.email) configuration value isn’t set. If ***this*** isn’t set, Git falls back to the system user and host names.

Notice the fields GIT\_COMMITTER\_DATE and GIT\_AUTHOR\_DATE. We need to modify these two puppies.

So, I created an empty repository ([https://github.com/m3rashid/timestone](https://github.com/m3rashid/timestone)) and created a file ([README.md](http://README.md)) in it. And run the following git commands

```bash
git add README.md
GIT_AUTHOR_DATE='1970-01-01T00:00:00.000Z' GIT_COMMITTER_DATE='1970-01-01T00:00:00.000Z' git commit -m 'hello from past'
git push origin -u master
```

I wanted to go further with timestamps. But the UNIX timestamps limit us from 1 Jan 1970 to 19 Jan 2038. This has to do with the size limit of 32-bit UNIX timestamps ( 2^31 - 1 ). So, I gathered some of my Javascript skills and put them to a fun use case and calculated the above date as follows

```javascript
// Earliest known timestamp
new Date(000000000000).toISOString()
// '1970-01-01T00:00:00.000Z'

// UNIX timestamp doomsday (19 Jan 2038)
new Date('January 19, 2038').toISOString()
// '2038-01-18T18:30:00.000Z'
```

Just put these values in the commit message with environment variables set in, Ready to rock. Finally, I have a history covering the entire UNIX timestamp range.

![Entire commit history](https://cdn.hashnode.com/res/hashnode/image/upload/v1674625871714/7cb24454-6502-45b9-8ba5-d0228e970c33.png align="center")

Learn more about UNIX timestamps at [https://www.unixtimestamp.com/](https://www.unixtimestamp.com/)