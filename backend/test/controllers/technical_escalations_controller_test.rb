require "test_helper"

class TechnicalEscalationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @technical_escalation = technical_escalations(:one)
  end

  test "should get index" do
    get technical_escalations_url, as: :json
    assert_response :success
  end

  test "should create technical_escalation" do
    assert_difference("TechnicalEscalation.count") do
      post technical_escalations_url, params: { technical_escalation: { escalation_level: @technical_escalation.escalation_level, name: @technical_escalation.name, project_id: @technical_escalation.project_id } }, as: :json
    end

    assert_response :created
  end

  test "should show technical_escalation" do
    get technical_escalation_url(@technical_escalation), as: :json
    assert_response :success
  end

  test "should update technical_escalation" do
    patch technical_escalation_url(@technical_escalation), params: { technical_escalation: { escalation_level: @technical_escalation.escalation_level, name: @technical_escalation.name, project_id: @technical_escalation.project_id } }, as: :json
    assert_response :success
  end

  test "should destroy technical_escalation" do
    assert_difference("TechnicalEscalation.count", -1) do
      delete technical_escalation_url(@technical_escalation), as: :json
    end

    assert_response :no_content
  end
end
