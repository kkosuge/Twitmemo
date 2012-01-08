require 'spec_helper'

describe "memos/edit" do
  before(:each) do
    @memo = assign(:memo, stub_model(Memo,
      :name => "MyString",
      :note => "MyText",
      :flag => 1
    ))
  end

  it "renders the edit memo form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => memos_path(@memo), :method => "post" do
      assert_select "input#memo_name", :name => "memo[name]"
      assert_select "textarea#memo_note", :name => "memo[note]"
      assert_select "input#memo_flag", :name => "memo[flag]"
    end
  end
end
