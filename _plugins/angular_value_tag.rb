module Jekyll
  class AngularValueTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @tag_name = tag_name,
      @text     = text
      @tokens   = tokens
    end

    def render(context)
      '{{%s}}'%@text
    end
  end
end

Liquid::Template.register_tag('angular_value', Jekyll::AngularValueTag)
