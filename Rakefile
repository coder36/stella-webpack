require 'net/http'
require 'file-tail'
require 'timeout'

desc "Start in production mode"

namespace :prod do
  desc "start in production mode"
  task :start => [:stop,:build] do
    cmd = "rackup --env production &>rack.log &"
    puts cmd
    `#{cmd}`
    fail "#{cmd} Failed" unless watch_for('rack.log', [/WEBrick::HTTPServer#start/])
  end

  desc "build production dist dir"
  task :build => "node:start" do
    system(<<-SCRIPT)
    rm -rf dist
    mkdir -p dist
    jspm bundle-sfx js/main dist/app.js
    ./node_modules/.bin/uglifyjs dist/app.js -m -c -o dist/app.min.js
    cp -r public/img dist/img
    cp -r public/fonts dist/fonts

    SCRIPT

    strip_index_html
  end

end

desc "bootstrap environment"
task :bootstrap do
  system(<<-SCRIPT)
  npm install jspm -g
  npm install babel -g
  npm install
  jspm install

  SCRIPT
end


def watch_for filename, regex_list
  Timeout::timeout(10) {
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

desc "start application"
task :start => [:stop, "node:start"] do
  cmd = "rackup --env test &>rack.log &"
  puts cmd
  `#{cmd}`
  fail "#{cmd} Failed" unless watch_for('rack.log', [/WEBrick::HTTPServer#start/])
end


desc "stop application"
task :stop => "node:stop"  do
  `lsof -ti tcp:9292 -sTCP:LISTEN | xargs kill -9`
end

namespace "node" do

  desc "start node"
  task :start => "node:stop" do
    cmd = "babel-node --stage 0 server.js &>node.log &"
    puts cmd
    `#{cmd}`
    fail "#{cmd} Failed" unless watch_for('node.log', [/listening at http/])
  end

  desc "stop node"
  task :stop do
    `lsof -ti tcp:3000 -sTCP:LISTEN | xargs kill -9`
  end

end


def strip_index_html
  File.open('dist/index.html', 'w') do |out|
    File.open('public/index.html').readlines.each do |line|
      line = '' if line[/config.js/]
      line = '' if line[/system.js/]
      line = '<script src="app.min.js"></script>' if line[/js\/main/]
      line = pre_rendered_html if line[/<!--pre_rendered_html-->/]
      out.write(line)
    end
  end

  File.open('dist/iso.html', 'w') do |out|
    File.open('public/index.html').readlines.each do |line|
      line = '' if line[/config.js/]
      line = '' if line[/system.js/]
      line = '' if line[/js\/main/]
      line = pre_rendered_html if line[/<!--pre_rendered_html-->/]
      out.write(line)
    end
  end

end

def pre_rendered_html
  url = 'http://localhost:3000'
  resp = Net::HTTP.get_response(URI.parse(url))
  resp.body
end

desc "deploy to heroku"
namespace :deploy do

  task :heroku => ['prod:build'] do
    root = "/tmp/stella_tmp"
    system(<<-SCRIPT)

    bundle install
    rm -rf #{root}
    mkdir #{root}
    cp -r ./app #{root}
    cp -r ./dist #{root}
    cp -r ./app.rb #{root}
    cp -r ./config.ru #{root}
    cp -r ./Gemfile* #{root}
    cd #{root}
    git init
    git add .
    git commit -m"heroku build"
    heroku login
    git remote add heroku https://git.heroku.com/vast-journey-2015.git
    git push --force heroku master

    SCRIPT

    puts 'Deployed to:'
    puts 'https://vast-journey-2015.herokuapp.com/index.html'

  end

end