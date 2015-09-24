require 'net/http'
require 'file-tail'
require 'timeout'

desc "bootstrap environment"
task :bootstrap do
  system(<<-SCRIPT)
  npm install webpack -g
  npm install webpack-dev-server -g
  npm install babel -g
  npm install

  SCRIPT
end


desc "Start server"
task :start => ['express:start', 'webpack:start'] do
end

desc "Stop server"
task :stop => ['express:stop', 'webpack:stop'] do
end

namespace :express do

  desc "start express server"
  task :start => [:stop] do
    cmd = "babel-node --stage=0  server.js &>express.log &"
    puts cmd
    `#{cmd}`
    fail "#{cmd} Failed" unless watch_for('express.log', [/Express listening/])
  end

  desc "stop express server"
  task :stop do
    `lsof -ti tcp:3000 -sTCP:LISTEN | xargs kill -9`
  end

end


namespace :webpack do
  desc "start webpack"
  task :start => [:stop] do
    cmd = "webpack -w &>webpack.log &"
    puts cmd
    `#{cmd}`
    fail "#{cmd} Failed" unless watch_for('webpack.log', [/Version: webpack/], 20)
  end

  desc "stop webpack"
  task :stop do
    `ps -eo "pid command" | grep -v 'grep' | grep 'webpack -w' | cut -f 1 -d ' ' | xargs kill -9`
  end
end


desc "build static content"
task :build do
  `webpack -p`
  Rake::Task["express:start"].invoke
  File.open('_gen/index.html', 'w') { |out| out.write call_url("http://localhost:3000/index") }
  File.open('_gen/iso.html', 'w') { |out| out.write call_url("http://localhost:3000/iso") }
  Rake::Task["express:start"].invoke
end





namespace :heroku do
  root = "/tmp/stella_webpack_tmp"

  desc "deploy to heroku"
  task :deploy => :build do

    system(<<-SCRIPT)

    webpack -p

    bundle install
    rm -rf #{root}
    mkdir #{root}
    cp -r ./_gen #{root}
    cp -r ./public #{root}
    cp -r ./views #{root}
    cp -r ./src #{root}
    cp ./package.json #{root}
    cp ./server.js #{root}
    cd #{root}
    git init
    git add .
    git commit -m"heroku build"
    heroku login
    git remote add heroku https://git.heroku.com/pure-mountain-5774.git
    git push --force heroku master

    SCRIPT

    puts 'Deployed to:'
    puts 'https://pure-mountain-5774.herokuapp.com/'

  end

  desc "heroku logs"
  task :logs do
    system("cd #{root}; heroku logs")
  end

end

def watch_for filename, regex_list, timeout = 10
  Timeout::timeout(timeout) {
    regex_list = [regex_list] if !regex_list.is_a? Array

    File::Tail::Logfile.open(filename) do |log|
      log.interval = 1
      log.tail do |line|
        puts line
        regex_list.each { |regex| return true if line =~ regex }
      end
    end
  } rescue nil

  false
end


def call_url url
  resp = Net::HTTP.get_response(URI.parse(url))
  fail "Error requesting #{url}" unless resp.code == '200'
  resp.body
end
