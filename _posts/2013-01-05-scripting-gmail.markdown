---
date: 2013-01-05
layout: text
alias: /post/39755076457/scripting-gmail
title: Scripting Gmail
categories: [thought]
---

<p>In an attempt to get on top of my email this year, I thought about writing an app to auto cleanup my inbox based on various rules. I love the idea of inbox zero, but would rather a lot of the heavy lifting was done for me - hitting archive is just too much work.</p>

<p>It turns out that Google provide a really easy way to script various google services, including gmail, through "scripts" within Google Drive. It's really straightforward: you can just write scripts in JavaScript with various google libraries to talk to each service, and since it's all within your google account you don't have to deal with authentication etc. You can easily set scripts up to auto-run every hour, day, etc too.</p>

<p>Since <a href="http://twitter.com/benwerd">Ben Werdmuller</a> <a href="https://twitter.com/benwerd/status/286910176471175169">asked for someone to write an app with almost the same functionality</a> I figured I should write it up.</p>

<ol>
<li><p>Go to Google Drive, and do <strong>Create > More > Script</strong></p></li>
<li><p>You can then script away to your hearts content. Here's the <a href="https://developers.google.com/apps-script/class_gmailapp">documentation</a> for the GmailApp library. <a href="https://gist.github.com/4462403">Here's my example</a> where I automatically archive anything that's over seven days old that I haven't starred.</p>

<pre><code> function archiveOld() {
   var q = 'in:inbox -is:starred older_than:7d';
   var threads = GmailApp.search(q);

   for (var thread in threads) {
     GmailApp.moveThreadToArchive(threads[thread]);
   }
 }

 archiveOld();
</code></pre></li>
<li><p>You can set up triggers to run your script daily/hourly etc with <strong>Resources > Current script triggers</strong>.</p></li>
<li><p>For more documentation on possible search queries like in my example above, <a href="http://support.google.com/mail/bin/answer.py?hl=en&amp;answer=7190">the very extensive search parameters docs are available here</a>.</p></li>
</ol>

