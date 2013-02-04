module Jekyll
  require 'yaml'
  class RenderScreenShotsTag
    def initialize(tag_name, text, tokens)
      super
      @tag_name = tag_name,
      @text     = text
      @tokens   = tokens
    end

    def render(context)
      code_fragments = []
      YAML.load(File.read('_screen_shots.yml')).each_with_index do |item_data, index|
        code_fragments << <<-HTML
          <div class="item#{index==0?' active':''}">
            <img src="images/screeny/#{item_data['file']}" alt="">
            <div class="carousel-caption">
              <h4>#{item_data['name']}</h4>
              <p>#{item_data['description']}</p>
            </div>
          </div>
        HTML
      end

      code_fragments.join
    end
  end
end

Liquid::Template.register_tag('screen_shots', Jekyll::RenderScreenShotsTag)
